package tenderi.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Postupci.
 */
@Entity
@Table(name = "postupci")
public class Postupci implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sifra_postupka", nullable = false)
    private Integer sifraPostupka;

    @Column(name = "broj_tendera")
    private String brojTendera;

    @NotNull
    @Column(name = "opis_postupka", nullable = false)
    private String opisPostupka;

    @NotNull
    @Column(name = "vrsta_postupka", nullable = false)
    private String vrstaPostupka;

    @Column(name = "datum_objave")
    private LocalDate datumObjave;

    @Column(name = "datum_otvaranja")
    private LocalDate datumOtvaranja;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatumOtvaranja() {
        return datumOtvaranja;
    }

    public void setDatumOtvaranja(LocalDate datumOtvaranja) {
        this.datumOtvaranja = datumOtvaranja.plusDays(1);
    }

    public Postupci id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getSifraPostupka() {
        return this.sifraPostupka;
    }

    public Postupci sifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
        return this;
    }

    public void setSifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public String getBrojTendera() {
        return this.brojTendera;
    }

    public Postupci brojTendera(String brojTendera) {
        this.brojTendera = brojTendera;
        return this;
    }

    public void setBrojTendera(String brojTendera) {
        this.brojTendera = brojTendera;
    }

    public String getOpisPostupka() {
        return this.opisPostupka;
    }

    public Postupci opisPostupka(String opisPostupka) {
        this.opisPostupka = opisPostupka;
        return this;
    }

    public void setOpisPostupka(String opisPostupka) {
        this.opisPostupka = opisPostupka;
    }

    public String getVrstaPostupka() {
        return this.vrstaPostupka;
    }

    public Postupci vrstaPostupka(String vrstaPostupka) {
        this.vrstaPostupka = vrstaPostupka;
        return this;
    }

    public void setVrstaPostupka(String vrstaPostupka) {
        this.vrstaPostupka = vrstaPostupka;
    }

    public LocalDate getDatumObjave() {
        return this.datumObjave;
    }

    public Postupci datumObjave(LocalDate datumObjave) {
        this.datumObjave = datumObjave;
        return this;
    }

    public void setDatumObjave(LocalDate datumObjave) {
        this.datumObjave = datumObjave.plusDays(1);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Postupci)) {
            return false;
        }
        return id != null && id.equals(((Postupci) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Postupci{" +
            "id=" + getId() +
            ", sifraPostupka=" + getSifraPostupka() +
            ", brojTendera='" + getBrojTendera() + "'" +
            ", opisPostupka='" + getOpisPostupka() + "'" +
            ", vrstaPostupka='" + getVrstaPostupka() + "'" +
            ", datumObjave='" + getDatumObjave() + "'" +
            "}";
    }
}
