package net.totalCloud.DDalki.dropbox;

import java.util.Locale;
import com.dropbox.core.DbxAppInfo;
import com.dropbox.core.DbxClient;
import com.dropbox.core.DbxEntry;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.DbxWebAuthNoRedirect;

public class DropboxList {
	public static void main(String[] args) {

		try {
			final String APP_KEY = "qzns5zfu3vczlxu";
			final String APP_SECRET = "001cd8v786u6d8v";

			DbxAppInfo appInfo = new DbxAppInfo(APP_KEY, APP_SECRET);

			DbxRequestConfig config = new DbxRequestConfig("AppTest112",
					Locale.getDefault().toString());

			DbxClient client = new DbxClient(config,
					"w5XObf1AiAoAAAAAAAAGU5yAaeDRgHvwbRXA75Yel7SmkJfwjf7kS_bpZ3DXpDH8");

			DbxWebAuthNoRedirect webAuth = new DbxWebAuthNoRedirect(config,
					appInfo);

			DbxEntry.WithChildren listing = client.getMetadataWithChildren("/");

			System.out.println("Files in the root path:");

			for (DbxEntry child : listing.children) {
				if (child.isFolder() == false) {
					System.out.println("	" + child.name + ": "
							+ child.toString());
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
