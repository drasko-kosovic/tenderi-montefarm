package tenderi.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Ugovor.
 */
@Entity
@Table(name = "ugovor")
public class Ugovor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "broj_ugovora")
    private String brojUgovora;

    @Column(name = "datum_ugovora")
    private LocalDate datumUgovora;

    @Column(name = "broj_odluke")
    private String brojOdluke;

    @Column(name = "datum_odluke")
    private LocalDate datumOdluke;

    @Column(name = "iznos_ugovora_bez_pdf")
    private Double iznosUgovoraBezPdf;

    @Column(name = "sifra_postupka")
    private Integer sifraPostupka;

    @Column(name = "sifra_ponude")
    private Integer sifraPonude;

    @Column(name = "sifra_ponudjaca")
    private Integer sifraPonudjaca;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ugovor id(Long id) {
        this.id = id;
        return this;
    }

    public String getBrojUgovora() {
        return this.brojUgovora;
    }

    public Ugovor brojUgovora(String brojUgovora) {
        this.brojUgovora = brojUgovora;
        return this;
    }

    public void setBrojUgovora(String brojUgovora) {
        this.brojUgovora = brojUgovora;
    }

    public LocalDate getDatumUgovora() {
        return this.datumUgovora;
    }

    public Ugovor datumUgovora(LocalDate datumUgovora) {
        this.datumUgovora = datumUgovora;
        return this;
    }

    public void setDatumUgovora(LocalDate datumUgovora) {
        this.datumUgovora = datumUgovora.plusDays(1);
    }

    public String getBrojOdluke() {
        return this.brojOdluke;
    }

    public Ugovor brojOdluke(String brojOdluke) {
        this.brojOdluke = brojOdluke;
        return this;
    }

    public void setBrojOdluke(String brojOdluke) {
        this.brojOdluke = brojOdluke;
    }

    public LocalDate getDatumOdluke() {
        return this.datumOdluke;
    }

    public Ugovor datumOdluke(LocalDate datumOdluke) {
        this.datumOdluke = datumOdluke;
        return this;
    }

    public void setDatumOdluke(LocalDate datumOdluke) {
        this.datumOdluke = datumOdluke.plusDays(1);
    }

    public Double getIznosUgovoraBezPdf() {
        return this.iznosUgovoraBezPdf;
    }

    public Ugovor iznosUgovoraBezPdf(Double iznosUgovoraBezPdf) {
        this.iznosUgovoraBezPdf = iznosUgovoraBezPdf;
        return this;
    }

    public void setIznosUgovoraBezPdf(Double iznosUgovoraBezPdf) {
        this.iznosUgovoraBezPdf = iznosUgovoraBezPdf;
    }

    public Integer getSifraPostupka() {
        return this.sifraPostupka;
    }

    public Ugovor sifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
        return this;
    }

    public void setSifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public Integer getSifraPonude() {
        return this.sifraPonude;
    }

    public Ugovor sifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
        return this;
    }

    public void setSifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
    }

    public Integer getSifraPonudjaca() {
        return this.sifraPonudjaca;
    }

    public Ugovor sifraPonudjaca(Integer sifraPonudjaca) {
        this.sifraPonudjaca = sifraPonudjaca;
        return this;
    }

    public void setSifraPonudjaca(Integer sifraPonudjaca) {
        this.sifraPonudjaca = sifraPonudjaca;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ugovor)) {
            return false;
        }
        return id != null && id.equals(((Ugovor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ugovor{" +
            "id=" + getId() +
            ", brojUgovora='" + getBrojUgovora() + "'" +
            ", datumUgovora='" + getDatumUgovora() + "'" +
            ", brojOdluke='" + getBrojOdluke() + "'" +
            ", datumOdluke='" + getDatumOdluke() + "'" +
            ", iznosUgovoraBezPdf=" + getIznosUgovoraBezPdf() +
            ", sifraPostupka=" + getSifraPostupka() +
            ", sifraPonude=" + getSifraPonude() +
            ", sifraPonudjaca=" + getSifraPonudjaca() +
            "}";
    }
}
