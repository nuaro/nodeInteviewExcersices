const Node = require('./LinkedListNode');

function printKToLast(head, k)
{
    if (head == null)
        return 0;
    index = printKToLast(head.next, k) + 1;
    if (index === k)
    {
        console.log(head.data);
    }
    return index;
}

const Head = new Node("test");
Head.append("test1");
Head.append("test2");
Head.append("test3");
Head.append("test3");
const NewNode = new Node("test4");
Head.appendNodeAtEnd(NewNode);

Head.printList();

printKToLast(Head, 2);