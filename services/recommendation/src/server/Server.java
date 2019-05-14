package server;


import org.apache.http.auth.AuthScope;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClients;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.riot.web.HttpOp;
import org.apache.jena.update.UpdateAction;
import org.apache.jena.update.UpdateException;
import org.apache.jena.update.UpdateExecutionFactory;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateProcessor;
import org.apache.jena.update.UpdateRequest;
import org.apache.jena.query.ResultSet;


import objects.Recomendation;

public class Server {

	private static String fusekiURL = "http://localhost:3030/test";
	private static String fusekiInsertURL = "http://localhost:3030/test/update";
	
	public boolean insertData() 
	{
		return true;
	}
	
	
	public Recomendation getRecomendation() 
	{	
		return new Recomendation();
	}
	
	
	public static void execInsertRating(String serviceURI, String query) {
			UpdateRequest request = UpdateFactory.create(query);
			UpdateProcessor processor = UpdateExecutionFactory.createRemote(request, serviceURI);
			processor.execute();
	}

	public static void execSelectAndPrint(String serviceURI, String query) {

			QueryExecution q = QueryExecutionFactory.sparqlService(serviceURI,
					query);

			ResultSet results = q.execSelect();

			ResultSetFormatter.out(System.out, results);

			while (results.hasNext()) {
				QuerySolution soln = results.nextSolution();
				RDFNode subject = soln.get("subject");
				System.out.println(subject);
			}
	}

	
	public static void main(String [] args)
	{
		
		CredentialsProvider credsProvider = new BasicCredentialsProvider();
		Credentials credentials = new UsernamePasswordCredentials("admin", "pw123");
		credsProvider.setCredentials(AuthScope.ANY, credentials);
		HttpClient httpclient = HttpClients.custom()
		    .setDefaultCredentialsProvider(credsProvider)
		    .build();
		HttpOp.setDefaultHttpClient(httpclient);

		
		
		String query = "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> " + 
					   "prefix owl: <http://www.w3.org/2002/07/owl#> " + 
					   "SELECT ?subject ?predicate ?object " + 
					   "WHERE { " + 
					   "  ?subject ?predicate ?object " + 
					   "} " + 
					   "LIMIT 25";
		
		
		String getVisualizationsVariables = "prefix : <http://paginas.fe.up.pt/~meg12003/vumo#>\n" + 
											"SELECT ?visualization ?inputVariable ?inputType\n" + 
											"WHERE {\n" + 
											"     ?visualization a :VisualizationTechnique.\n" + 
											"  	  ?visualization :hasInputVariable ?inputVariable.\n" + 
											"     ?inputVariable :hasCompatibleValueType ?inputType	\n" + 
											"}\n" + 
											"LIMIT 250";
		
		String getVisualizationRatings = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
										 "prefix : <http://paginas.fe.up.pt/~meg12003/vumo#>"  + 
										 "SELECT ?rating ?visualization ?ratingComponent ?value " +
										 "WHERE {" +
				     					 "?rating rdf:type :TechniqueRating."  +
				     					 "?rating :isAboutVisualizationTechnique  ?visualization." +
				     					 "?rating :hasRatingStatement ?ratingStatement. "  +
				     					 "?ratingStatement :hasRatingComponent ?ratingComponent. " +
				     					 "?ratingStatement :hasRatingScore | :hasRatingCategoricalValue  ?value;" +
				     					 "}" +
				     					 "LIMIT 250 ";
		
		String insertRating = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" + 
							  "prefix : <http://paginas.fe.up.pt/~meg12003/vumo#>\n" + 
						      "INSERT DATA {\n" + 
						      ":Rating4 rdf:type :TechniqueRating ;\n" + 
						      "  :isAboutVisualizationTechnique :barchart ;\n" + 
						      "  :hasRatingStatement [ \n" + 
						      "                        :hasRatingComponent :RecommendedTheme ;\n" + 
						      "                        :hasRatingCategoricalValue :TravelIntention ;\n" + 
						      "                      ] \n" + 
						      ".\n" + 
						      "}";
		
		//execSelectAndPrint(fusekiURL, getVisualizationRatings);
		execInsertRating(fusekiInsertURL, insertRating);
	}
	

}

