import com.basho.riak.client.api.RiakClient;
import com.basho.riak.client.api.commands.kv.DeleteValue;
import com.basho.riak.client.api.commands.kv.FetchValue;
import com.basho.riak.client.api.commands.kv.StoreValue;
import com.basho.riak.client.api.commands.kv.UpdateValue;
import com.basho.riak.client.core.RiakCluster;
import com.basho.riak.client.core.RiakNode;
import com.basho.riak.client.core.query.Location;
import com.basho.riak.client.core.query.Namespace;

import java.net.UnknownHostException;

public class TasteOfRiak {
    public static void main( String[] args ) {
        try {
            RiakCluster cluster = setUpCluster();
            RiakClient client = new RiakClient(cluster);
            System.out.println("\n\n\nStwozrenie Klienta Riak");

            Automotive car = new Automotive();
            car.brandName = "Citroen";
            car.modelName = "Berlingo";
            car.isHybrid = true;
            car.engineCapacity=2000;
            System.out.println("\n\n\nStwozrenie obiektu Automotive\n"+car.toString());

            Namespace automotiveBucket = new Namespace("automotives");
            Location citroenLocation = new Location(automotiveBucket, car.brandName);
            StoreValue storeAutomotiveOp = new StoreValue.Builder(car)
                    .withLocation(citroenLocation)
                    .build();
            client.execute(storeAutomotiveOp);
            System.out.println("\n\n\nZapisanie pierwszego obiektu Automotive do bucketu");


            FetchValue fetchCitroenOp = new FetchValue.Builder(citroenLocation).build();
            Automotive fetchedAutomotive = client.execute(fetchCitroenOp).getValue(Automotive.class);
            System.out.println("\n\n Pobrany obiekt automotive : \n"+ fetchedAutomotive.toString()+"\n\n\n");


            car.isHybrid = false;
            AutomotiveUpdate updatedCar = new AutomotiveUpdate(car);
            UpdateValue updateValue = new UpdateValue.Builder(citroenLocation).withUpdate(updatedCar).build();
            UpdateValue.Response response = client.execute(updateValue);
            System.out.println("\n\n\nAktualizacja obiektu w bucket");

            System.out.println("\nResponse :  "+response);

            DeleteValue deleteOp = new DeleteValue.Builder(citroenLocation).build();
            client.execute(deleteOp);
            System.out.println("\n\n\nUsunięcie Obiektu automotive");


            fetchCitroenOp = new FetchValue.Builder(citroenLocation).build();
            fetchedAutomotive = client.execute(fetchCitroenOp).getValue(Automotive.class);
            System.out.println("Próba pobrania po usunięciu, rezultat : \n "+fetchedAutomotive);

            cluster.shutdown();

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    private static RiakCluster setUpCluster() throws UnknownHostException {
        RiakNode node = new RiakNode.Builder()
                .withRemoteAddress("127.0.0.1")
                .withRemotePort(8087)
                .build();

        RiakCluster cluster = new RiakCluster.Builder(node)
                .build();

        cluster.start();

        return cluster;
    }
}