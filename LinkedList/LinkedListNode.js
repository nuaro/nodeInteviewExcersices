class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

     append(data)
    {
        let currentNode = this;
        while(currentNode.next != null)
        {
            currentNode = currentNode.next;
        }
        currentNode.next = new Node(data);
    }

    appendNodeAtEnd(NewNode)
    {
        let currentNode = this;
        while (currentNode.next != null)
        {
            currentNode = currentNode.next;
        }
        currentNode.next = NewNode;
    }

    printList()
    {
        let currentNode = this;
        while(currentNode != null)
        {
            console.log(currentNode.data+"->");
            currentNode = currentNode.next;
        }
    }
}
module.exports = Node;