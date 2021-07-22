package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tenderi.domain.Ponudjaci;
import tenderi.domain.PonudjaciPonude;
import tenderi.repository.PonudjaciPonudeRepository;

import java.util.List;

/**
 * REST controller for managing {@link Ponudjaci}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PonudjaciPonudeResource {

    private final Logger log = LoggerFactory.getLogger(PonudjaciPonudeResource.class);

    private static final String ENTITY_NAME = "PonudjaciPonude";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PonudjaciPonudeRepository ponudjaciPonudeRepository;

    public PonudjaciPonudeResource(PonudjaciPonudeRepository ponudjaciPonudeRepository) {
        this.ponudjaciPonudeRepository = ponudjaciPonudeRepository;
    }


    @GetMapping("/ponudjaci_ponude")
    public List<PonudjaciPonude> allPonudjaciPonuded() {

        return ponudjaciPonudeRepository.findAll();
    }

    @GetMapping("/ponudjaci_ponude/{sifraPostupka}")
    public List<PonudjaciPonude> allPonudjaciPonudeSifraPostupka(@PathVariable Integer sifraPostupka) {

        return ponudjaciPonudeRepository.findBySifraPostupka(sifraPostupka);
    }


}
