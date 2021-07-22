package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import tenderi.domain.Ugovor;
import tenderi.repository.UgovorRepository;
import tenderi.web.rest.errors.BadRequestAlertException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link Ugovor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UgovorResource {

    private final Logger log = LoggerFactory.getLogger(UgovorResource.class);

    private static final String ENTITY_NAME = "ugovor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UgovorRepository ugovorRepository;

    public UgovorResource(UgovorRepository ugovorRepository) {
        this.ugovorRepository = ugovorRepository;
    }

    /**
     * {@code POST  /ugovors} : Create a new ugovor.
     *
     * @param ugovor the ugovor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ugovor, or with status {@code 400 (Bad Request)} if the ugovor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ugovors")
    public ResponseEntity<Ugovor> createUgovor(@Valid @RequestBody Ugovor ugovor) throws URISyntaxException {
        log.debug("REST request to save Ugovor : {}", ugovor);
        if (ugovor.getId() != null) {
            throw new BadRequestAlertException("A new ugovor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ugovor result = ugovorRepository.save(ugovor);
        return ResponseEntity
            .created(new URI("/api/ugovors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ugovors/:id} : Updates an existing ugovor.
     *
     * @param id the id of the ugovor to save.
     * @param ugovor the ugovor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ugovor,
     * or with status {@code 400 (Bad Request)} if the ugovor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ugovor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ugovors/{id}")
    public ResponseEntity<Ugovor> updateUgovor(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Ugovor ugovor
    ) throws URISyntaxException {
        log.debug("REST request to update Ugovor : {}, {}", id, ugovor);
        if (ugovor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ugovor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ugovorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ugovor result = ugovorRepository.save(ugovor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ugovor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ugovors/:id} : Partial updates given fields of an existing ugovor, field will ignore if it is null
     *
     * @param id the id of the ugovor to save.
     * @param ugovor the ugovor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ugovor,
     * or with status {@code 400 (Bad Request)} if the ugovor is not valid,
     * or with status {@code 404 (Not Found)} if the ugovor is not found,
     * or with status {@code 500 (Internal Server Error)} if the ugovor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ugovors/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Ugovor> partialUpdateUgovor(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Ugovor ugovor
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ugovor partially : {}, {}", id, ugovor);
        if (ugovor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ugovor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ugovorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ugovor> result = ugovorRepository
            .findById(ugovor.getId())
            .map(
                existingUgovor -> {
                    if (ugovor.getBrojUgovora() != null) {
                        existingUgovor.setBrojUgovora(ugovor.getBrojUgovora());
                    }
                    if (ugovor.getDatumUgovora() != null) {
                        existingUgovor.setDatumUgovora(ugovor.getDatumUgovora());
                    }

                    if (ugovor.getIznosUgovoraBezPdf() != null) {
                        existingUgovor.setIznosUgovoraBezPdf(ugovor.getIznosUgovoraBezPdf());
                    }
                    if (ugovor.getSifraPostupka() != null) {
                        existingUgovor.setSifraPostupka(ugovor.getSifraPostupka());
                    }
                    if (ugovor.getSifraPonude() != null) {
                        existingUgovor.setSifraPonude(ugovor.getSifraPonude());
                    }


                    return existingUgovor;
                }
            )
            .map(ugovorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ugovor.getId().toString())
        );
    }

    /**
     * {@code GET  /ugovors} : get all the ugovors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ugovors in body.
     */
    @GetMapping("/ugovors")
    public List<Ugovor> getAllUgovors() {
        log.debug("REST request to get all Ugovors");
        return ugovorRepository.findAll();
    }

    /**
     * {@code GET  /ugovors/:id} : get the "id" ugovor.
     *
     * @param id the id of the ugovor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ugovor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ugovors/{id}")
    public ResponseEntity<Ugovor> getUgovor(@PathVariable Long id) {
        log.debug("REST request to get Ugovor : {}", id);
        Optional<Ugovor> ugovor = ugovorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ugovor);
    }

    /**
     * {@code DELETE  /ugovors/:id} : delete the "id" ugovor.
     *
     * @param id the id of the ugovor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ugovors/{id}")
    public ResponseEntity<Void> deleteUgovor(@PathVariable Long id) {
        log.debug("REST request to delete Ugovor : {}", id);
        ugovorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/ugovor/{sifra_postupka}")
    public List<Ugovor> getPonude(@PathVariable Integer sifra_postupka) {
        return ugovorRepository.findBySifraPostupka(sifra_postupka);
    }
}
