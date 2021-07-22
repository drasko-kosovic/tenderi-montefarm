package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.ResponseUtil;
import tenderi.domain.Ponude;
import tenderi.domain.ViewPonude;
import tenderi.repository.ViewPonudeRepository;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link Ponude}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ViewPonudeResource {

    private final Logger log = LoggerFactory.getLogger(ViewPonudeResource.class);

    private static final String ENTITY_NAME = "ponude";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ViewPonudeRepository viewPonudeRepository;

    public ViewPonudeResource(ViewPonudeRepository viewPonudeRepository) {
        this.viewPonudeRepository = viewPonudeRepository;
    }

    @GetMapping("/view_ponude/{sifra_postupka}")
    public List<ViewPonude> getViewPonude(@PathVariable Integer sifra_postupka) {
        return viewPonudeRepository.findBySifraPostupka(sifra_postupka);
    }

    @GetMapping("/view_ponude-sifra-ponude/{sifra_ponude}")
    public List<ViewPonude> getViewSifraPonude(@PathVariable Integer sifra_ponude) {
        return viewPonudeRepository.findBySifraPonude(sifra_ponude);
    }

    @GetMapping("/view_ponude")
    public List<ViewPonude> getAllViewPonude() {
        log.debug("REST request to get all Ponudes");
        return viewPonudeRepository.findAll();
    }

    @GetMapping("/view_ponudes/{id}")
    public ResponseEntity<ViewPonude> getViewPonude(@PathVariable Long id) {
        log.debug("REST request to get Ponude : {}", id);
        Optional<ViewPonude> ponude = viewPonudeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ponude);
    }
}
