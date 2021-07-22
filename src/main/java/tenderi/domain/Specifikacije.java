package tenderi.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A Specifikacije.
 */
@Entity
@Table(name = "specifikacije")
public class Specifikacije implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sifra_postupka", nullable = false)
    private Integer sifraPostupka;

    @NotNull
    @Column(name = "broj_partije", nullable = false)
    private Integer brojPartije;

    @Column(name = "atc")
    private String atc;

    @Column(name = "inn")
    private String inn;

    @Column(name = "farmaceutski_oblik_lijeka")
    private String farmaceutskiOblikLijeka;

    @Column(name = "jacina_lijeka")
    private String jacinaLijeka;

    public String getJedinicaMjere() {
        return jedinicaMjere;
    }

    public void setJedinicaMjere(String jedinicaMjere) {
        this.jedinicaMjere = jedinicaMjere;
    }

    @NotNull
    @Column(name = "trazena_kolicina", nullable = false)
    private Integer trazenaKolicina;

    @Column(name = "pakovanje")
    private String pakovanje;

    @Column(name = "jedinica_mjere")
    private String jedinicaMjere;

    @NotNull
    @Column(name = "procijenjena_vrijednost", nullable = false)
    private Double procijenjenaVrijednost;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Specifikacije id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getSifraPostupka() {
        return this.sifraPostupka;
    }

    public Specifikacije sifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
        return this;
    }

    public void setSifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public Integer getBrojPartije() {
        return this.brojPartije;
    }

    public Specifikacije brojPartije(Integer brojPartije) {
        this.brojPartije = brojPartije;
        return this;
    }

    public void setBrojPartije(Integer brojPartije) {
        this.brojPartije = brojPartije;
    }

    public String getAtc() {
        return this.atc;
    }

    public Specifikacije atc(String atc) {
        this.atc = atc;
        return this;
    }

    public void setAtc(String atc) {
        this.atc = atc;
    }

    public String getInn() {
        return this.inn;
    }

    public Specifikacije inn(String inn) {
        this.inn = inn;
        return this;
    }

    public void setInn(String inn) {
        this.inn = inn;
    }

    public String getFarmaceutskiOblikLijeka() {
        return this.farmaceutskiOblikLijeka;
    }

    public Specifikacije farmaceutskiOblikLijeka(String farmaceutskiOblikLijeka) {
        this.farmaceutskiOblikLijeka = farmaceutskiOblikLijeka;
        return this;
    }

    public void setFarmaceutskiOblikLijeka(String farmaceutskiOblikLijeka) {
        this.farmaceutskiOblikLijeka = farmaceutskiOblikLijeka;
    }

    public String getJacinaLijeka() {
        return this.jacinaLijeka;
    }

    public Specifikacije jacinaLijeka(String jacinaLijeka) {
        this.jacinaLijeka = jacinaLijeka;
        return this;
    }

    public void setJacinaLijeka(String jacinaLijeka) {
        this.jacinaLijeka = jacinaLijeka;
    }

    public Integer getTrazenaKolicina() {
        return this.trazenaKolicina;
    }

    public Specifikacije trazenaKolicina(Integer trazenaKolicina) {
        this.trazenaKolicina = trazenaKolicina;
        return this;
    }

    public void setTrazenaKolicina(Integer trazenaKolicina) {
        this.trazenaKolicina = trazenaKolicina;
    }

    public String getPakovanje() {
        return this.pakovanje;
    }

    public Specifikacije pakovanje(String pakovanje) {
        this.pakovanje = pakovanje;
        return this;
    }

    public void setPakovanje(String pakovanje) {
        this.pakovanje = pakovanje;
    }

    public Double getProcijenjenaVrijednost() {
        return this.procijenjenaVrijednost;
    }

    public Specifikacije procijenjenaVrijednost(Double procijenjenaVrijednost) {
        this.procijenjenaVrijednost = procijenjenaVrijednost;
        return this;
    }

    public void setProcijenjenaVrijednost(Double procijenjenaVrijednost) {
        this.procijenjenaVrijednost = procijenjenaVrijednost;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Specifikacije)) {
            return false;
        }
        return id != null && id.equals(((Specifikacije) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Specifikacije{" +
            "id=" + getId() +
            ", sifraPostupka=" + getSifraPostupka() +
            ", brojPartije=" + getBrojPartije() +
            ", atc='" + getAtc() + "'" +
            ", inn='" + getInn() + "'" +
            ", farmaceutskiOblikLijeka='" + getFarmaceutskiOblikLijeka() + "'" +
            ", jacinaLijeka='" + getJacinaLijeka() + "'" +
            ", trazenaKolicina=" + getTrazenaKolicina() +
            ", pakovanje='" + getPakovanje() + "'" +
            ", procijenjenaVrijednost=" + getProcijenjenaVrijednost() +
            "}";
    }
}
