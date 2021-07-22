package tenderi.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Ponudjaci.
 */
@Entity
@Table(name = "ponudjaci")
public class Ponudjaci implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    @Column(name = "odgovorno_lice")
    private String odgovornoLice;

    @Column(name = "adresa_ponudjaca")
    private String adresaPonudjaca;

    @Column(name = "banka_racun")
    private String bankaRacun;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ponudjaci id(Long id) {
        this.id = id;
        return this;
    }

    public String getNazivPonudjaca() {
        return this.nazivPonudjaca;
    }

    public Ponudjaci nazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
        return this;
    }

    public void setNazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
    }

    public String getOdgovornoLice() {
        return this.odgovornoLice;
    }

    public Ponudjaci odgovornoLice(String odgovornoLice) {
        this.odgovornoLice = odgovornoLice;
        return this;
    }

    public void setOdgovornoLice(String odgovornoLice) {
        this.odgovornoLice = odgovornoLice;
    }

    public String getAdresaPonudjaca() {
        return this.adresaPonudjaca;
    }

    public Ponudjaci adresaPonudjaca(String adresaPonudjaca) {
        this.adresaPonudjaca = adresaPonudjaca;
        return this;
    }

    public void setAdresaPonudjaca(String adresaPonudjaca) {
        this.adresaPonudjaca = adresaPonudjaca;
    }

    public String getBankaRacun() {
        return this.bankaRacun;
    }

    public Ponudjaci bankaRacun(String bankaRacun) {
        this.bankaRacun = bankaRacun;
        return this;
    }

    public void setBankaRacun(String bankaRacun) {
        this.bankaRacun = bankaRacun;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ponudjaci)) {
            return false;
        }
        return id != null && id.equals(((Ponudjaci) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return (
            "Ponudjaci{" +
            "id=" +
            id +
            ", nazivPonudjaca='" +
            nazivPonudjaca +
            '\'' +
            ", odgovornoLice='" +
            odgovornoLice +
            '\'' +
            ", adresaPonudjaca='" +
            adresaPonudjaca +
            '\'' +
            ", bankaRacun='" +
            bankaRacun +
            '\'' +
            '}'
        );
    }
}
