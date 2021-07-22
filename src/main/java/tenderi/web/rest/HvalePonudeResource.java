package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.PaginationUtil;
import tenderi.domain.HvalePonude;
import tenderi.repository.HvalePonudeRepository;

import java.util.List;

/**
 * REST controller for managing {@link HvalePonude}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HvalePonudeResource {

    private final Logger log = LoggerFactory.getLogger(HvalePonudeResource.class);

    private final HvalePonudeRepository hvalePonudeRepository;

    public HvalePonudeResource(HvalePonudeRepository hvalePonudeRepository) {
        this.hvalePonudeRepository = hvalePonudeRepository;
    }

    /**
     * {@code GET  /hvale-ponudes} : get all the hvalePonudes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of hvalePonudes in body.
     */
    @GetMapping("/hvale-ponude")
    public ResponseEntity<List<HvalePonude>> getAllHvalePonudes(Pageable pageable) {
        log.debug("REST request to get a page of HvalePonudes");
        Page<HvalePonude> page = hvalePonudeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /hvale-ponudes/:id} : get the "id" hvalePonude.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the hvalePonude, or with status {@code 404 (Not Found)}.
     */

    @GetMapping("/hvale/{sifra}")
    public List<HvalePonude> getHvalePonude(@PathVariable Integer sifra) {
        List<HvalePonude> hvalePonude = hvalePonudeRepository.HvalePonude(sifra);
        return hvalePonude;
    }
}
