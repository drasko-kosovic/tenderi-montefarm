package tenderi.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A Naruclac.
 */
@Entity
@Table(name = "naruclac")
public class Naruclac implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "naziv", nullable = false)
    private String naziv;

    @Column(name = "adresa")
    private String adresa;

    @Column(name = "racun")
    private String racun;

    @Column(name = "telefon")
    private String telefon;

    @Column(name = "pib")
    private String pib;

    @Column(name = "pdv")
    private String pdv;

    @Column(name = "odgovorno_lice_narucioca")
    private String odgovornoLiceNarucioca;

    @Column(name = "email")
    private String email;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Naruclac id(Long id) {
        this.id = id;
        return this;
    }

    public String getNaziv() {
        return this.naziv;
    }

    public Naruclac naziv(String naziv) {
        this.naziv = naziv;
        return this;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getAdresa() {
        return this.adresa;
    }

    public Naruclac adresa(String adresa) {
        this.adresa = adresa;
        return this;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getRacun() {
        return this.racun;
    }

    public Naruclac racun(String racun) {
        this.racun = racun;
        return this;
    }

    public void setRacun(String racun) {
        this.racun = racun;
    }

    public String getTelefon() {
        return this.telefon;
    }

    public Naruclac telefon(String telefon) {
        this.telefon = telefon;
        return this;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getPib() {
        return this.pib;
    }

    public Naruclac pib(String pib) {
        this.pib = pib;
        return this;
    }

    public void setPib(String pib) {
        this.pib = pib;
    }

    public String getPdv() {
        return this.pdv;
    }

    public Naruclac pdv(String pdv) {
        this.pdv = pdv;
        return this;
    }

    public void setPdv(String pdv) {
        this.pdv = pdv;
    }

    public String getOdgovornoLiceNarucioca() {
        return this.odgovornoLiceNarucioca;
    }

    public Naruclac odgovornoLiceNarucioca(String odgovornoLiceNarucioca) {
        this.odgovornoLiceNarucioca = odgovornoLiceNarucioca;
        return this;
    }

    public void setOdgovornoLiceNarucioca(String odgovornoLiceNarucioca) {
        this.odgovornoLiceNarucioca = odgovornoLiceNarucioca;
    }

    public String getEmail() {
        return this.email;
    }

    public Naruclac email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Naruclac)) {
            return false;
        }
        return id != null && id.equals(((Naruclac) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Naruclac{" +
            "id=" + getId() +
            ", naziv='" + getNaziv() + "'" +
            ", adresa='" + getAdresa() + "'" +
            ", racun='" + getRacun() + "'" +
            ", telefon='" + getTelefon() + "'" +
            ", pib='" + getPib() + "'" +
            ", pdv='" + getPdv() + "'" +
            ", odgovornoLiceNarucioca='" + getOdgovornoLiceNarucioca() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
