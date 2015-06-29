package net.totalCloud.DDalki.dropbox;

import java.io.FileOutputStream;
import java.util.Locale;

import com.dropbox.core.DbxClient;
import com.dropbox.core.DbxEntry;
import com.dropbox.core.DbxRequestConfig;

public class DropboxDownload {
	public static void main(String[] args) {

		try {
			DbxRequestConfig config = new DbxRequestConfig("AppTest112",
					Locale.getDefault().toString());

			DbxClient client = new DbxClient(config,
					"w5XObf1AiAoAAAAAAAAGMGFE7m6SUHhKysMV02b64HHSS-GfV9Hhr7ZDM5ytua5N");

			FileOutputStream outputStream = new FileOutputStream(
					"working-draft.txt");

			DbxEntry.File downloadedFile = client.getFile("/working-draft.txt",
					null, outputStream);

			System.out.println("Metadata: " + downloadedFile.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
