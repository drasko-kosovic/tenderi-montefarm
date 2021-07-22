package tenderi.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import tenderi.domain.Prvorangirani;
import tenderi.repository.PrvorangiraniRepository;

import java.util.List;

/**
 * REST controller for managing {@link Prvorangirani}.
 */
@RestController
@RequestMapping("/api")
public class PrvorangiraniResource {

    private final Logger log = LoggerFactory.getLogger(PrvorangiraniResource.class);

    private final PrvorangiraniRepository prvorangiraniRepository;

    public PrvorangiraniResource(PrvorangiraniRepository prvorangiraniRepository) {
        this.prvorangiraniRepository = prvorangiraniRepository;
    }

    @GetMapping("/prvorangirani")
    public List<Prvorangirani> getAllPrvorangiranis() {
        return prvorangiraniRepository.findAll();
    }

    @GetMapping("/prvorangirani/{sifraPostupka}")
    public List<Prvorangirani> findByPostupakPrvorangirani(@PathVariable Integer sifraPostupka) {
        return prvorangiraniRepository.findBySifraPostupka(sifraPostupka);
    }

    @GetMapping("/prvorangirani-ponude/{sifraPonude}")
    public List<Prvorangirani> findByPonudePrvorangirani(@PathVariable Integer sifraPonude) {
        return prvorangiraniRepository.findBySifraPonude(sifraPonude);
    }

    @GetMapping("/prvorangirani/ugovor")
    public List<Prvorangirani> findByPrvorangiraniUgovor(@RequestParam Integer sifraPostupka, Integer sifraPonude) {
        return prvorangiraniRepository.findBySifraPostupkaAndSifraPonude(sifraPostupka,sifraPonude);
    }
}
