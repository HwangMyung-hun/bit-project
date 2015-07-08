package net.totalCloud.DDalki.dropbox;


import com.dropbox.core.*;

import java.io.*;
import java.util.Locale;

public class DropboxMain {
	public static void main(String[] args) throws IOException, DbxException {
		// Get your app key and secret from the Dropbox developers website.
		final String APP_KEY = "m7kqx6bxchawqxj";
		final String APP_SECRET = "u1rh8j0xcd8k7lh";

		DbxAppInfo appInfo = new DbxAppInfo(APP_KEY, APP_SECRET);

		DbxRequestConfig config = new DbxRequestConfig("AppTest112", Locale
				.getDefault().toString());
		DbxWebAuthNoRedirect webAuth = new DbxWebAuthNoRedirect(config, appInfo);

		// Have the user sign in and authorize your app.
		String authorizeUrl = webAuth.start();
		System.out.println("1. Go to: " + authorizeUrl);
		System.out
				.println("2. Click \"Allow\" (you might have to log in first)");
		System.out.println("3. Copy the authorization code.");
		
		String code = new BufferedReader(new InputStreamReader(System.in))
				.readLine().trim();

		// This will fail if the user enters an invalid authorization code.
		DbxAuthFinish authFinish = webAuth.finish(code);
		String accessToken = authFinish.accessToken;
		String tokenType = webAuth.toString();
		String UID = authFinish.toString();
		
		DbxClient client = new DbxClient(config, accessToken);

		System.out.println("Linked account: "
				+ client.getAccountInfo().displayName);
		
		System.out.println(accessToken);
		System.out.println(tokenType);
		System.out.println(UID);
		
	}
	
}