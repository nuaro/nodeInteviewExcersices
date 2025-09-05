const Node = require('./LinkedListNode');

function removeDups(head)
{
    let set = new Set();
     var currentNode = head;
     while(head != null)
     {
         if (set.has(head.data))
         {
             currentNode.next = head.next;
         }
         else
         {
             set.add(head.data);
             currentNode = head;
         }
         head = head.next;
     }
}


const Head = new Node("test");
Head.append("test1");
Head.append("test2");
Head.append("test3");
Head.append("test3");



Head.printList()
removeDups(Head);
Head.printList();