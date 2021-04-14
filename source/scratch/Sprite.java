package scratch;

import org.json.simple.JSONObject;
import scratch.blocks.Block;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

public class Sprite {

    private String name;
    private boolean isVisible = true;
    private int size = 100;
    private int xPos = 0;
    private int yPos = 0;
    private int rotation = 90;

    private JSONObject blocks;
    private Queue<Block> actions;
    private Map<String, Block> idToBlock;

    public Sprite() {
        actions = new LinkedList<>();
        idToBlock = new HashMap<>();
    }

    public Sprite(String name) {
        this();

        this.name = name;
    }

    public Sprite(String name, JSONObject blocks) {
        this(name);

        this.blocks = blocks;
    }

    public Sprite(String name, JSONObject blocks, boolean isVisible, int size, int xPos, int yPos, int rotation) {
        this(name, blocks);

        this.isVisible = isVisible;
        this.size = size;
        this.xPos = xPos;
        this.yPos = yPos;
        this.rotation = rotation;
    }

    public Sprite(JSONObject obj) {
        this(obj.get("name").toString(), (JSONObject) obj.get("blocks"),
                Boolean.getBoolean(obj.get("visible").toString()), Integer.parseInt(obj.get("size").toString()),
                Integer.parseInt(obj.get("x").toString()), Integer.parseInt(obj.get("y").toString()),
                Integer.parseInt(obj.get("direction").toString()));
    }

    public void parseBlocks() {
        for (Object s : blocks.keySet()) {
            String key = s.toString();
            Block block = ScratchParser.getBlock((JSONObject) blocks.get(key));
            idToBlock.put(key, block);
        }
    }

    @Override
    public String toString() {
        return "Sprite{" +
                "name='" + name + '\'' +
                ", isVisible=" + isVisible +
                ", size=" + size +
                ", xPos=" + xPos +
                ", yPos=" + yPos +
                ", rotation=" + rotation +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isVisible() {
        return isVisible;
    }

    public void setVisible(boolean visible) {
        isVisible = visible;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getxPos() {
        return xPos;
    }

    public void setxPos(int xPos) {
        this.xPos = xPos;
    }

    public int getyPos() {
        return yPos;
    }

    public void setyPos(int yPos) {
        this.yPos = yPos;
    }

    public int getRotation() {
        return rotation;
    }

    public void setRotation(int rotation) {
        this.rotation = rotation;
    }

    public JSONObject getBlocks() {
        return blocks;
    }

    public void setBlocks(JSONObject blocks) {
        this.blocks = blocks;
    }

    public Queue<Block> getActions() {
        return actions;
    }

    public void setActions(Queue<Block> actions) {
        this.actions = actions;
    }

    public Map<String, Block> getIdToBlock() {
        return idToBlock;
    }

    public void setIdToBlock(Map<String, Block> idToBlock) {
        this.idToBlock = idToBlock;
    }
}
