package tenderi.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A HvalePonude.
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class HvalePonude implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sifra_postupka")
    private Integer sifraPostupka;

    @Column(name = "broj_partije")
    private Integer brojPartije;

    @Column(name = "inn")
    private String inn;

    @Column(name = "farmaceutski_oblik_lijeka")
    private String farmaceutskiOblikLijeka;

    @Column(name = "pakovanje")
    private String pakovanje;

    @Column(name = "trazena_kolicina")
    private Integer trazenaKolicina;

    @Column(name = "procijenjena_vrijednost")
    private Double procijenjenaVrijednost;

    public Long getId() {
        return id;
    }

    public Integer getSifraPostupka() {
        return sifraPostupka;
    }

    public Integer getBrojPartije() {
        return brojPartije;
    }

    public String getInn() {
        return inn;
    }

    public String getFarmaceutskiOblikLijeka() {
        return farmaceutskiOblikLijeka;
    }

    public String getPakovanje() {
        return pakovanje;
    }

    public Integer getTrazenaKolicina() {
        return trazenaKolicina;
    }

    public Double getProcijenjenaVrijednost() {
        return procijenjenaVrijednost;
    }
}
