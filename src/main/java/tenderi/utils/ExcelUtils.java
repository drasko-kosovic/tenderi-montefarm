package tenderi.utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import tenderi.domain.Ponude;

import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelUtils {

    public static String EXCELTYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    public static ByteArrayInputStream customersToExcel(List<Ponude> ponude) throws IOException {
        String[] COLUMNs = {
            "Id",
            "Sifra Postupka",
            "Sifra Ponude",
            "Broj Partije",
            "Naziv Proizvodjaca",
            "Zasticeni Naziv",
            "Ponudjena Vrijednost",
            "Rok Isporuke",
            "Datum Ponude",
            "Sifra Ponudjaca",
        };
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            CreationHelper createHelper = workbook.getCreationHelper();

            Sheet sheet = workbook.createSheet("Ponude");

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLUE.getIndex());

            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Row for Header
            Row headerRow = sheet.createRow(0);

            // Header
            for (int col = 0; col < COLUMNs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }

            // CellStyle for Age
            CellStyle ageCellStyle = workbook.createCellStyle();
            ageCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("#"));

            int rowIdx = 1;
            for (Ponude ponudes : ponude) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(ponudes.getId());
                row.createCell(1).setCellValue(ponudes.getSifraPostupka());
                row.createCell(2).setCellValue(ponudes.getSifraPonude());
                row.createCell(3).setCellValue(ponudes.getBrojPartije());
                row.createCell(4).setCellValue(ponudes.getNazivProizvodjaca());
                row.createCell(5).setCellValue(ponudes.getZasticeniNaziv());
                row.createCell(6).setCellValue(ponudes.getPonudjenaVrijednost());
                row.createCell(7).setCellValue(ponudes.getRokIsporuke());
                row.createCell(8).setCellValue(ponudes.getDatumPonude());
                row.createCell(9).setCellValue(ponudes.getSifraPonudjaca());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    public static List<Ponude> parseExcelFile(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet("Ponude");
            Iterator<Row> rows = sheet.iterator();

            List<Ponude> lstPonude = new ArrayList<Ponude>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellsInRow = currentRow.iterator();

                Ponude ponude = new Ponude();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();

                    switch (cellIdx) {
                        case 0:
                            ponude.setId((long) currentCell.getNumericCellValue());
                            break;
                        case 1:
                            ponude.setSifraPostupka((int) currentCell.getNumericCellValue());
                            break;
                        case 2:
                            ponude.setSifraPonude((int) currentCell.getNumericCellValue());
                            break;
                        case 3:
                            ponude.setBrojPartije((int) currentCell.getNumericCellValue());
                            break;
                        case 4:
                            ponude.setNazivProizvodjaca(currentCell.getStringCellValue());
                            break;
                        case 5:
                            ponude.setZasticeniNaziv(currentCell.getStringCellValue());
                            break;
                        case 6:
                            ponude.setPonudjenaVrijednost(currentCell.getNumericCellValue());
                            break;
                        case 7:
                            ponude.setRokIsporuke((int) currentCell.getNumericCellValue());
                            break;
                        case 8:
                            ponude.setDatumPonude(currentCell.getLocalDateTimeCellValue().toLocalDate());
                            break;
                        case 9:
                            ponude.setSifraPonudjaca((int) currentCell.getNumericCellValue());
                            break;
                        default:
                            break;
                    }

                    cellIdx++;
                }

                lstPonude.add(ponude);
            }

            // Close WorkBook
            workbook.close();

            return lstPonude;
        } catch (IOException e) {
            throw new RuntimeException("FAIL! -> message = " + e.getMessage());
        }
    }

    public static boolean isExcelFile(MultipartFile file) {
        if (!EXCELTYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }
}
