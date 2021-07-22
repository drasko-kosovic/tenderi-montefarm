package tenderi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tenderi.domain.Prvorangirani;

import java.util.List;

/**
 * Spring Data SQL repository for the Prvorangirani entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrvorangiraniRepository extends JpaRepository<Prvorangirani, Long>, JpaSpecificationExecutor<Prvorangirani> {
    //    @Query("select p from Prvorangirani p where p.sifraPostupka=:sifraPostupka")
    List<Prvorangirani> findBySifraPostupka(@Param("sifraPostupka") Integer sifra);

    @Query("select p from Prvorangirani p where p.sifraPonude=:sifraPonude")
    List<Prvorangirani> findBySifraPonude(@Param("sifraPonude") Integer sifra);


    List<Prvorangirani> findBySifraPostupkaAndSifraPonude(@Param("sifraPostupka") Integer sifraPostupka, @Param("sifraPonude") Integer sifraPonude);


}
