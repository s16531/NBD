public class Automotive {
    public String modelName;
    public String brandName;
    public int engineCapacity;
    public boolean isHybrid;

    @Override
    public String toString() {
        return "Automotive{" +
                "modelName='" + modelName + '\'' +
                ", brandName='" + brandName + '\'' +
                ", engineCapacity=" + engineCapacity +
                ", isHybrid=" + isHybrid +
                '}';
    }
}
