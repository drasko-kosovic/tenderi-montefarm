package tenderi.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Ponude.
 */
@Entity
@Table(name = "view_ponude")
public class ViewPonude implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sifra_postupka", nullable = false)
    private Integer sifraPostupka;

    @NotNull
    @Column(name = "sifra_ponude", nullable = false)
    private Integer sifraPonude;

    @NotNull
    @Column(name = "broj_partije", nullable = false)
    private Integer brojPartije;

    @Column(name = "sifra_ponudjaca")
    private Integer sifraPonudjaca;

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    @Column(name = "naziv_proizvodjaca")
    private String nazivProizvodjaca;

    @Column(name = "zasticeni_naziv")
    private String zasticeniNaziv;

    @NotNull
    @Column(name = "ponudjena_vrijednost", nullable = false)
    private Double ponudjenaVrijednost;

    @NotNull
    @Column(name = "rok_isporuke", nullable = false)
    private Integer rokIsporuke;

    @Column(name = "selected")
    private Boolean selected;

    @Column(name = "datum_ponude", nullable = true)
    private LocalDate datumPonude;

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

    public Integer getSifraPonudjaca() {
        return sifraPonudjaca;
    }

    public String getNazivPonudjaca() {
        return nazivPonudjaca;
    }

    public String getNazivProizvodjaca() {
        return nazivProizvodjaca;
    }

    public String getZasticeniNaziv() {
        return zasticeniNaziv;
    }

    public Double getPonudjenaVrijednost() {
        return ponudjenaVrijednost;
    }

    public Integer getRokIsporuke() {
        return rokIsporuke;
    }

    public Boolean getSelected() {
        return selected;
    }

    public LocalDate getDatumPonude() {
        return datumPonude;
    }
}
