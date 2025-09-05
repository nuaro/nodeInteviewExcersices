const Node = require('./LinkedListNode');
const Head = new Node("test");

function removeMidleNode(node)
{
    while(node.next.next != null)
    {
        node.data = node.next.data;
        node.next = node.next.next;
    }
}

Head.append("test1");
Head.append("test2");
Head.append("test3");
Head.append("test3");
const NewNode = new Node("test4");
const NewNode2 = new Node("test5");
const NewNode3 = new Node("test6");
Head.appendNodeAtEnd(NewNode);
Head.appendNodeAtEnd(NewNode2);
Head.appendNodeAtEnd(NewNode3);
Head.printList();

removeMidleNode(NewNode);

Head.printList();