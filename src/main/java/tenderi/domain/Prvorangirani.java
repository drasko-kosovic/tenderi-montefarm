package tenderi.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Prvorangirani.
 */
@Entity
@Table(name = "view_prvorangirani")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Prvorangirani implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sifra_postupka")
    private Integer sifraPostupka;

    @Column(name = "sifra_ponude")
    private Integer sifraPonude;

    @Column(name = "broj_partije")
    private Integer brojPartije;

    @Column(name = "atc")
    private String atc;

    @Column(name = "inn")
    private String inn;

    @Column(name = "zasticeni_naziv")
    private String zasticeniNaziv;

    @Column(name = "farmaceutski_oblik_lijeka")
    private String farmaceutskiOblikLijeka;

    @Column(name = "jacina_lijeka")
    private String jacinaLijeka;

    @Column(name = "pakovanje")
    private String pakovanje;

    @Column(name = "trazena_kolicina")
    private Integer trazenaKolicina;

    @Column(name = "procijenjena_vrijednost")
    private Double procijenjenaVrijednost;

    @Column(name = "ponudjena_vrijednost")
    private Double ponudjenaVrijednost;

    @Column(name = "rok_isporuke")
    private Integer rokIsporuke;

    public String getNazivProizvodjaca() {
        return nazivProizvodjaca;
    }

    @Column(name = "naziv_proizvodjaca")
    private String nazivProizvodjaca;

    public Double getBodCijena() {
        return bodCijena;
    }

    public Double getBodRok() {
        return bodRok;
    }

    public Double getBodUkupno() {
        return bodUkupno;
    }

    public String getNazivPonudjaca() {
        return nazivPonudjaca;
    }

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    @Column(name = "bod_cijena")
    private Double bodCijena;

    @Column(name = "bod_rok")
    private Double bodRok;

    @Column(name = "bod_ukupno")
    private Double bodUkupno;

    public Long getId() {
        return id;
    }

    public Integer getSifraPostupka() {
        return sifraPostupka;
    }

    public Integer getSifraPonude() {
        return sifraPonude;
    }

    public Integer getBrojPartije() {
        return brojPartije;
    }

    public String getAtc() {
        return atc;
    }

    public String getInn() {
        return inn;
    }

    public String getZastceniNaziv() {
        return zasticeniNaziv;
    }

    public String getFarmaceutskiOblikLijeka() {
        return farmaceutskiOblikLijeka;
    }

    public String getJacinaLijeka() {
        return jacinaLijeka;
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

    public Double getPonudjenaVrijednost() {
        return ponudjenaVrijednost;
    }

    public Integer getRokIsporuke() {
        return rokIsporuke;
    }
}
