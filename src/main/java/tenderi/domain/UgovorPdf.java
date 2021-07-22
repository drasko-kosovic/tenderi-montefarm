package tenderi.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Ugovor.
 */
@Entity
@Table(name = "view_ugovor")
public class UgovorPdf implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "broj_ugovora")
    private String brojUgovora;

    @Column(name = "datum_ugovora")
    private LocalDate datumUgovora;

    @Column(name = "predmet_ugovora")
    private String predmetUgovora;

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    @Column(name = "broj_datum_tenderske_dokumntacije")
    private String brojDatumTenderskeDokumntacije;

    @Column(name = "broj_datum_odluke")
    private String brojDatumOdluke;

    @Column(name = "broj_datum_ponude")
    private String brojDatumPonude;

    @Column(name = "iznos_ugovora_bez_pdf")
    private Integer iznosUgovoraBezPdf;

    @Column(name = "sifra_postupka")
    private Integer sifraPostupka;

    @Column(name = "sifra_ponude")
    private Integer sifraPonude;

    @Column(name = "odgovorno_lice")
    private String odgovornoLice;

    @Column(name = "adresa_ponudjaca")
    private String adresaPonudjaca;

    @Column(name = "banka_racun")
    private String bankaRacun;

    @Column(name = "datum_objave")
    private LocalDate datumObjave;

    public LocalDate getDatumObjave() {
        return datumObjave;
    }

    @Column(name = "vrsta_postupka")
    private String vrstaPostupka;

    public Long getId() {
        return id;
    }

    public String getBrojUgovora() {
        return brojUgovora;
    }

    public LocalDate getDatumUgovora() {
        return datumUgovora;
    }

    public String getPredmetUgovora() {
        return predmetUgovora;
    }

    public String getNazivPonudjaca() {
        return nazivPonudjaca;
    }

    public String getBrojDatumTenderskeDokumntacije() {
        return brojDatumTenderskeDokumntacije;
    }

    public String getBrojDatumOdlukeIzbora() {
        return brojDatumOdluke;
    }

    public String getBrojDatumPonude() {
        return brojDatumPonude;
    }

    public Integer getIznosUgovoraBezPdf() {
        return iznosUgovoraBezPdf;
    }

    public Integer getSifraPostupka() {
        return sifraPostupka;
    }

    public Integer getSifraPonude() {
        return sifraPonude;
    }

    public String getOdgovornoLice() {
        return odgovornoLice;
    }

    public String getAdresaPonudjaca() {
        return adresaPonudjaca;
    }

    public String getBankaRacun() {
        return bankaRacun;
    }

    public String getVrstaPostupka() {
        return vrstaPostupka;
    }
}
