package tenderi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tenderi.domain.Ugovor;

import java.util.List;

/**
 * Spring Data SQL repository for the Ugovor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UgovorRepository extends JpaRepository<Ugovor, Long> {
    List<Ugovor> findBySifraPostupka(Integer sifra_postupka);


}
