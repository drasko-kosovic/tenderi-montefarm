package tenderi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tenderi.domain.Postupci;

/**
 * Spring Data SQL repository for the Postupci entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostupciRepository extends JpaRepository<Postupci, Long> {}
