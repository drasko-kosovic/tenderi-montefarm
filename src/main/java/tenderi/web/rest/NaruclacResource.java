package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import tenderi.domain.Naruclac;
import tenderi.repository.NaruclacRepository;
import tenderi.web.rest.errors.BadRequestAlertException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link Naruclac}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NaruclacResource {

    private final Logger log = LoggerFactory.getLogger(NaruclacResource.class);

    private static final String ENTITY_NAME = "naruclac";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NaruclacRepository naruclacRepository;

    public NaruclacResource(NaruclacRepository naruclacRepository) {
        this.naruclacRepository = naruclacRepository;
    }

    /**
     * {@code POST  /naruclacs} : Create a new naruclac.
     *
     * @param naruclac the naruclac to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new naruclac, or with status {@code 400 (Bad Request)} if the naruclac has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/naruclacs")
    public ResponseEntity<Naruclac> createNaruclac(@Valid @RequestBody Naruclac naruclac) throws URISyntaxException {
        log.debug("REST request to save Naruclac : {}", naruclac);
        if (naruclac.getId() != null) {
            throw new BadRequestAlertException("A new naruclac cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Naruclac result = naruclacRepository.save(naruclac);
        return ResponseEntity
            .created(new URI("/api/naruclacs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /naruclacs/:id} : Updates an existing naruclac.
     *
     * @param id the id of the naruclac to save.
     * @param naruclac the naruclac to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated naruclac,
     * or with status {@code 400 (Bad Request)} if the naruclac is not valid,
     * or with status {@code 500 (Internal Server Error)} if the naruclac couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/naruclacs/{id}")
    public ResponseEntity<Naruclac> updateNaruclac(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Naruclac naruclac
    ) throws URISyntaxException {
        log.debug("REST request to update Naruclac : {}, {}", id, naruclac);
        if (naruclac.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, naruclac.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!naruclacRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Naruclac result = naruclacRepository.save(naruclac);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, naruclac.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /naruclacs/:id} : Partial updates given fields of an existing naruclac, field will ignore if it is null
     *
     * @param id the id of the naruclac to save.
     * @param naruclac the naruclac to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated naruclac,
     * or with status {@code 400 (Bad Request)} if the naruclac is not valid,
     * or with status {@code 404 (Not Found)} if the naruclac is not found,
     * or with status {@code 500 (Internal Server Error)} if the naruclac couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/naruclacs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Naruclac> partialUpdateNaruclac(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Naruclac naruclac
    ) throws URISyntaxException {
        log.debug("REST request to partial update Naruclac partially : {}, {}", id, naruclac);
        if (naruclac.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, naruclac.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!naruclacRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Naruclac> result = naruclacRepository
            .findById(naruclac.getId())
            .map(
                existingNaruclac -> {
                    if (naruclac.getNaziv() != null) {
                        existingNaruclac.setNaziv(naruclac.getNaziv());
                    }
                    if (naruclac.getAdresa() != null) {
                        existingNaruclac.setAdresa(naruclac.getAdresa());
                    }
                    if (naruclac.getRacun() != null) {
                        existingNaruclac.setRacun(naruclac.getRacun());
                    }
                    if (naruclac.getTelefon() != null) {
                        existingNaruclac.setTelefon(naruclac.getTelefon());
                    }
                    if (naruclac.getPib() != null) {
                        existingNaruclac.setPib(naruclac.getPib());
                    }
                    if (naruclac.getPdv() != null) {
                        existingNaruclac.setPdv(naruclac.getPdv());
                    }
                    if (naruclac.getOdgovornoLiceNarucioca() != null) {
                        existingNaruclac.setOdgovornoLiceNarucioca(naruclac.getOdgovornoLiceNarucioca());
                    }
                    if (naruclac.getEmail() != null) {
                        existingNaruclac.setEmail(naruclac.getEmail());
                    }

                    return existingNaruclac;
                }
            )
            .map(naruclacRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, naruclac.getId().toString())
        );
    }

    /**
     * {@code GET  /naruclacs} : get all the naruclacs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of naruclacs in body.
     */
    @GetMapping("/naruclacs")
    public List<Naruclac> getAllNaruclacs() {
        log.debug("REST request to get all Naruclacs");
        return naruclacRepository.findAll();
    }

    /**
     * {@code GET  /naruclacs/:id} : get the "id" naruclac.
     *
     * @param id the id of the naruclac to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the naruclac, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/naruclacs/{id}")
    public ResponseEntity<Naruclac> getNaruclac(@PathVariable Long id) {
        log.debug("REST request to get Naruclac : {}", id);
        Optional<Naruclac> naruclac = naruclacRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(naruclac);
    }

    /**
     * {@code DELETE  /naruclacs/:id} : delete the "id" naruclac.
     *
     * @param id the id of the naruclac to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/naruclacs/{id}")
    public ResponseEntity<Void> deleteNaruclac(@PathVariable Long id) {
        log.debug("REST request to delete Naruclac : {}", id);
        naruclacRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
