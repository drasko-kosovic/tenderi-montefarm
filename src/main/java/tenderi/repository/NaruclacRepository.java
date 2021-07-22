package tenderi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tenderi.domain.Naruclac;

/**
 * Spring Data SQL repository for the Naruclac entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NaruclacRepository extends JpaRepository<Naruclac, Long> {}
