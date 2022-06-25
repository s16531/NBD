import com.basho.riak.client.api.commands.kv.UpdateValue;

// This will allow us to update the book object handling the
// entire fetch/modify/update cycle.
public class AutomotiveUpdate extends UpdateValue.Update<Automotive> {
    private final Automotive update;

    public AutomotiveUpdate(Automotive update) {
        this.update = update;
    }

    @Override
    public Automotive apply(Automotive t) {
        if (t == null) {
            t = new Automotive();
        }

        t.brandName = update.brandName;
        t.engineCapacity = update.engineCapacity;
        t.isHybrid = update.isHybrid;
        t.modelName = update.modelName;

        return t;
    }
}
