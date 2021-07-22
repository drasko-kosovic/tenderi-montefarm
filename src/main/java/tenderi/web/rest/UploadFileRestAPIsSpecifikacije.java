package tenderi.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tenderi.Message;
import tenderi.service.ExcelFileServicesSpecifikacije;
import tenderi.utils.ExcelUtils;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
public class UploadFileRestAPIsSpecifikacije {

    @Autowired
    ExcelFileServicesSpecifikacije excelFileServicesSpecifikacije;

    @PostMapping("/api/uploadfiles/specifikacije")
    public Message uploadFileMulti(@RequestParam("uploadfiles") MultipartFile[] uploadfiles) {
        // Get file name
        String uploadedFileName = Arrays
            .stream(uploadfiles)
            .map(x -> x.getOriginalFilename())
            .filter(x -> !StringUtils.isEmpty(x))
            .collect(Collectors.joining(" , "));

        if (StringUtils.isEmpty(uploadedFileName)) {
            return new Message(uploadedFileName, "please select a file!", "fail");
        }

        String notExcelFiles = Arrays
            .stream(uploadfiles)
            .filter(x -> !ExcelUtils.isExcelFile(x))
            .map(x -> x.getOriginalFilename())
            .collect(Collectors.joining(" , "));

        /*
         * if(!StringUtils.isEmpty(notExcelFiles)) { return new Message(notExcelFiles,
         * "Not Excel Files", "fail"); }
         */

        try {
            for (MultipartFile file : uploadfiles) {
                excelFileServicesSpecifikacije.store(file);
            }
            return new Message(uploadedFileName, "Upload Successfully", "ok");
        } catch (Exception e) {
            return new Message(uploadedFileName, e.getMessage(), "fail");
        }
    }
}
