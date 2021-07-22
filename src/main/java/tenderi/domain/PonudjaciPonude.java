package tenderi.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "view_list_ponudjaci")
public class PonudjaciPonude implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;


    public Integer getSifraPostupka() {
        return sifraPostupka;
    }

    @NotNull
    @Column(name = "sifra_postupka", nullable = false)
    private Integer sifraPostupka;

    @NotNull
    @Column(name = "sifra_ponude", nullable = false)
    private Integer sifraPonude;
    @NotNull
    @Column(name = "naziv_ponudjaca", nullable = false)
    private String nazivPonudjaca;

    public Long getId() {
        return id;
    }

    public String getNazivPonudjaca() {
        return nazivPonudjaca;
    }

    public Integer getSifraPonude() {
        return sifraPonude;
    }
}
