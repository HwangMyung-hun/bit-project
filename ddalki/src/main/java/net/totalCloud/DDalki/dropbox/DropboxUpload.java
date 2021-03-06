package net.totalCloud.DDalki.dropbox;

import java.io.File;
import java.io.FileInputStream;
import java.util.Locale;

import com.dropbox.core.DbxClient;
import com.dropbox.core.DbxEntry;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.DbxWriteMode;

public class DropboxUpload {

	public static void main(String[] args) throws Exception {

		try {
			DbxRequestConfig config = new DbxRequestConfig("AppTest112",
					Locale.getDefault().toString());

			DbxClient client = new DbxClient(config, "w5XObf1AiAoAAAAAAAAGcVezrk-8ryquTVQ11OV75Sd9JiFXFZ2G3ipvxuqWV1jj");

			File inputFile = new File("working-draft.txt");
			
			FileInputStream fileInputStream = new FileInputStream(inputFile);
			
			DbxEntry.File uploadedFile = client.uploadFile("/working-draft.txt", DbxWriteMode.add(), inputFile.length(), fileInputStream);
			
			System.out.println("Uploaded: " + uploadedFile.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
