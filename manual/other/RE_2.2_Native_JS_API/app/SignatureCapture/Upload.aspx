<%@ Import namespace="System.Web.UI.HtmlControls" %>
<%@ Import namespace="System.IO" %>

<script runat="server" language="C#">

	//called when the file is submitted	
	protected void Page_Load(object o, EventArgs e) 
	{
		//check we have submitted a file
		if( spbImagerFile.PostedFile != null )
		{
			// Get a reference to PostedFile object
			HttpPostedFile myFile = spbImagerFile.PostedFile;

			// Get size of uploaded file
			int nFileLen = myFile.ContentLength; 

			// make sure the size of the file is > 0
			if( nFileLen > 0 )
			{
				// Allocate a buffer for reading of the file
				byte[] myData = new byte[nFileLen];

				// Read uploaded file from the Stream
				myFile.InputStream.Read(myData, 0, nFileLen);

				// Create a name for the file to store
				string strFilename = Path.GetFileName(myFile.FileName);

				// Write data into a file
				WriteToFile(Server.MapPath(strFilename), ref myData);
				
				// Write a response back to sender
                Response.Write("FileSent");

			}
		}
		
	}
	
	// Writes file to current folder
	private void WriteToFile(string strPath, ref byte[] Buffer)
	{
		// Create a file
		FileStream newFile = new FileStream(strPath, FileMode.Create);

		// Write data to the file
		newFile.Write(Buffer, 0, Buffer.Length);

		// Close file
		newFile.Close();
	}
</script>

<form name="spbImagerForm" method="post" action="upload.aspx" id="spbImagerForm" enctype="multipart/form-data">
<input id="spbImagerFile" type="file" runat="server" Visible="false">
</form>