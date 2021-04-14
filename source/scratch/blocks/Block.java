package scratch.blocks;

public abstract class Block {

    private String opcode = null;
    private String next = null;
    private String parent = null;
    private Object inputs;
    private boolean isShadow;

    public Block(String opcode, String next, String parent, Object inputs, boolean isShadow) {
        this.opcode = opcode;
        this.next = next.equals("null") ? null : next;
        this.parent = parent.equals("null") ? null : parent;
        this.inputs = inputs;
        this.isShadow = isShadow;
    }

    @Override
    public String toString() {
        return "opcode='" + opcode + '\'' +
                ", next='" + next + '\'' +
                ", parent='" + parent + '\'' +
                ", inputs=" + inputs +
                ", isShadow=" + isShadow;
    }
}
