package tenderi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tenderi.domain.ViewPonude;

import java.util.List;

/**
 * Spring Data SQL repository for the ViewPonude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ViewPonudeRepository extends JpaRepository<ViewPonude, Long> {
    List<ViewPonude> findBySifraPostupka(Integer sifra_postupka);
    List<ViewPonude> findViewPonudeByBrojPartije(Integer sifra_postupka);

    @Query(value = "select * from view_ponude p  where p.sifra_ponude = 10000 ", nativeQuery = true)
    List<ViewPonude> allViewPonude();

    List<ViewPonude> findBySifraPonude(Integer sifra_ponude);
}
