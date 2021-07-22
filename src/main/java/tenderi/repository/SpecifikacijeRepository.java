package tenderi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tenderi.domain.Specifikacije;

import java.util.List;

/**
 * Spring Data SQL repository for the Specifikacije entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpecifikacijeRepository extends JpaRepository<Specifikacije, Long> {
    List<Specifikacije> findBySifraPostupka(Integer sifra_postupka);

    @Query(value = "select * from specifikacije  where specifikacije.sifra_postupka = 100000 ",nativeQuery = true)
    List<Specifikacije> allSpecifikacije();
}
