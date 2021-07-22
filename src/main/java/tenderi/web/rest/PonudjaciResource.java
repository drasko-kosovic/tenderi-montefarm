package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import tenderi.domain.Ponudjaci;
import tenderi.repository.PonudjaciRepository;
import tenderi.web.rest.errors.BadRequestAlertException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link Ponudjaci}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PonudjaciResource {

    private final Logger log = LoggerFactory.getLogger(PonudjaciResource.class);

    private static final String ENTITY_NAME = "ponudjaci";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PonudjaciRepository ponudjaciRepository;

    public PonudjaciResource(PonudjaciRepository ponudjaciRepository) {
        this.ponudjaciRepository = ponudjaciRepository;
    }

    /**
     * {@code POST  /ponudjacis} : Create a new ponudjaci.
     *
     * @param ponudjaci the ponudjaci to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ponudjaci, or with status {@code 400 (Bad Request)} if the ponudjaci has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ponudjacis")
    public ResponseEntity<Ponudjaci> createPonudjaci(@Valid @RequestBody Ponudjaci ponudjaci) throws URISyntaxException {
        log.debug("REST request to save Ponudjaci : {}", ponudjaci);
        if (ponudjaci.getId() != null) {
            throw new BadRequestAlertException("A new ponudjaci cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ponudjaci result = ponudjaciRepository.save(ponudjaci);
        return ResponseEntity
            .created(new URI("/api/ponudjacis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ponudjacis/:id} : Updates an existing ponudjaci.
     *
     * @param id the id of the ponudjaci to save.
     * @param ponudjaci the ponudjaci to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ponudjaci,
     * or with status {@code 400 (Bad Request)} if the ponudjaci is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ponudjaci couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ponudjacis/{id}")
    public ResponseEntity<Ponudjaci> updatePonudjaci(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Ponudjaci ponudjaci
    ) throws URISyntaxException {
        log.debug("REST request to update Ponudjaci : {}, {}", id, ponudjaci);
        if (ponudjaci.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ponudjaci.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ponudjaciRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ponudjaci result = ponudjaciRepository.save(ponudjaci);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ponudjaci.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ponudjacis/:id} : Partial updates given fields of an existing ponudjaci, field will ignore if it is null
     *
     * @param id the id of the ponudjaci to save.
     * @param ponudjaci the ponudjaci to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ponudjaci,
     * or with status {@code 400 (Bad Request)} if the ponudjaci is not valid,
     * or with status {@code 404 (Not Found)} if the ponudjaci is not found,
     * or with status {@code 500 (Internal Server Error)} if the ponudjaci couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ponudjacis/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Ponudjaci> partialUpdatePonudjaci(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Ponudjaci ponudjaci
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ponudjaci partially : {}, {}", id, ponudjaci);
        if (ponudjaci.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ponudjaci.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ponudjaciRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ponudjaci> result = ponudjaciRepository
            .findById(ponudjaci.getId())
            .map(
                existingPonudjaci -> {
                    if (ponudjaci.getNazivPonudjaca() != null) {
                        existingPonudjaci.setNazivPonudjaca(ponudjaci.getNazivPonudjaca());
                    }
                    if (ponudjaci.getOdgovornoLice() != null) {
                        existingPonudjaci.setOdgovornoLice(ponudjaci.getOdgovornoLice());
                    }
                    if (ponudjaci.getAdresaPonudjaca() != null) {
                        existingPonudjaci.setAdresaPonudjaca(ponudjaci.getAdresaPonudjaca());
                    }
                    if (ponudjaci.getBankaRacun() != null) {
                        existingPonudjaci.setBankaRacun(ponudjaci.getBankaRacun());
                    }

                    return existingPonudjaci;
                }
            )
            .map(ponudjaciRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ponudjaci.getId().toString())
        );
    }

    /**
     * {@code GET  /ponudjacis} : get all the ponudjacis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ponudjacis in body.
     */
    @GetMapping("/ponudjacis")
    public List<Ponudjaci> getAllPonudjacis() {
        log.debug("REST request to get all Ponudjacis");
        return ponudjaciRepository.findAll();
    }

    @GetMapping("/ponudjacis/{id}")
    public ResponseEntity<Ponudjaci> getPonudjaci(@PathVariable Long id) {
        log.debug("REST request to get Ponudjaci : {}", id);
        Optional<Ponudjaci> ponudjaci = ponudjaciRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ponudjaci);
    }


    /**
     * {@code DELETE  /ponudjacis/:id} : delete the "id" ponudjaci.
     *
     * @param id the id of the ponudjaci to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ponudjacis/{id}")
    public ResponseEntity<Void> deletePonudjaci(@PathVariable Long id) {
        log.debug("REST request to delete Ponudjaci : {}", id);
        ponudjaciRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
