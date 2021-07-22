package tenderi.web.rest;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.ooxml.JRDocxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import tenderi.domain.Anex;
import tenderi.domain.Postupci;
import tenderi.repository.AnexRepository;
import tenderi.repository.PostupciRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = ("*"))
@RestController
@RequestMapping("api/report")
public class PrvorangiraniPdf {

    @Autowired
    ApplicationContext context;

    @Autowired
    AnexRepository anexRepository;

    @Autowired
    PostupciRepository postupciRepository;

    @GetMapping(path = "/prvorangirani")
    @ResponseBody
    public void getPdfUgovor(HttpServletResponse response, @RequestParam Integer sifraPostupka, @RequestParam Integer sifraPonude)
        throws Exception {
        Resource resource = context.getResource("classpath:reports/ReportAnex.jrxml");
        InputStream inputStream = resource.getInputStream();
        JasperReport report = JasperCompileManager.compileReport(inputStream);

        Map<String, Object> params = new HashMap<>();

        List<Anex> anex = anexRepository.findBySifraPostupkaAndSifraPonude(sifraPostupka, sifraPonude);

        //Data source Set
        JRDataSource dataSource = new JRBeanCollectionDataSource(anex);
        params.put("datasource", dataSource);

        //        JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
        //        JRDocxExporter export = new JRDocxExporter();
        //        export.setExporterInput(new SimpleExporterInput(jasperPrint));
        //        export.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
        //        response.setHeader("Content-Disposition", "attachment;filename=jasperfile.docx");
        //        response.setContentType("application/octet-stream");
        //        export.exportReport();
        //    }

        //Make jasperPrint
        JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
        //Media Type
        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        //Export PDF Stream
        JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
    }

    @GetMapping(path = "/postupci-docx")
    @ResponseBody
    public void getDocxUgovor(HttpServletResponse response) throws Exception {
        Resource resource = context.getResource("classpath:reports/postupci.jrxml");
        InputStream inputStream = resource.getInputStream();
        JasperReport report = JasperCompileManager.compileReport(inputStream);

        Map<String, Object> params = new HashMap<>();

        List<Postupci> postupci = postupciRepository.findAll();

        //Data source Set
        JRDataSource dataSource = new JRBeanCollectionDataSource(postupci);
        params.put("datasource", dataSource);

        JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
        JRDocxExporter export = new JRDocxExporter();
        export.setExporterInput(new SimpleExporterInput(jasperPrint));
        export.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
        response.setHeader("Content-Disposition", "attachment;filename=jasperfile.docx");
        response.setContentType("application/octet-stream");
        export.exportReport();
    }
    //        export.setExporterOutput(new SimpleOutputStreamExporterOutput(new File("C:\\Users\\drasko\\Downloads\\report.docx")));
    //
    //        SimpleDocxReportConfiguration config = new SimpleDocxReportConfiguration();
    ////config.setFlexibleRowHeight(true); //Set desired configuration
    //
    //        export.setConfiguration(config);
    //        export.exportReport();
    //Make jasperPrint

    //        //Media Type
    //        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
    //        //Export PDF Stream
    //        JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());

}
