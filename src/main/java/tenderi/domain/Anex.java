package tenderi.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Prvorangirani.
 */
@Entity
@Table(name = "view_anex")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Anex implements Serializable {

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

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    @Column(name = "naziv_proizvodjaca")
    private String nazivProizvodjaca;

    @Column(name = "broj_ugovora")
    private String brojUgovora;

    @Column(name = "datum_ugovora")
    private LocalDate datumUgovora;

    public String getNazivPonudjaca() {
        return nazivPonudjaca;
    }

    public String getBrojUgovora() {
        return brojUgovora;
    }

    public LocalDate getDatumUgovora() {
        return datumUgovora;
    }

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
