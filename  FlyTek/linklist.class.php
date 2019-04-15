<?php

class Link
{
    public $data;
    
    public $next;
    
    function __construct($data)
    {
        $this->data = $data;
        $this->next = NULL;
    }
    
    function readLink()
    {
        return $this->data;
    }
}


class LinkList
{
    
    private $firstLink;
    
        
   
    private $count;

    private $refcount;
    
    
    
    
    function __construct()
    {
        $this->firstLink = NULL;
        $this->count = 0;
        $this->refcount=0;
    }

    public function isEmpty()
    {
        return ($this->firstLink == NULL);
    }
    
    
     public function insert($Data)
    {
       
        $link = new Link($Data);
        $prev=NULL;
        $curr=$this->firstLink;      
        while($curr!=NULL && $Data['name']> $curr->data['name'])
         {
            $prev=$curr;
            $curr=$curr->next;
         }
        
        if($prev==NULL)
        {
            $this->firstLink=&$link;
        }else
        {
            $prev->next=&$link;
        }
        $link->next=$curr;
       
        $this->refcount++;
        $this->count++;
    }
    public function getRef()
    {
        if(!$this->isEmpty()){
            if($this->count==156)
                $this->refcount=0;
            return $this->refcount;
        }
        else
            return 0;
    }
   
    
    public function deleteLink($key,$ref)
    {
        $curr = $this->firstLink;
        $previous = NULL;

        while($curr!= NULL)
        {
            if($curr->data['refnum']==$ref && $curr->data['name']==$key)
            {
                if($curr == $this->firstLink)
                     {
                        $temp=$this->firstLink;
                        $this->firstLink = $this->firstLink->next;
                        unset($temp);
                     }
                 else
                 {
                     $previous->next = $curr->next;
                     unset($curr);
                 }
                 $this->count--;
                return;
            }
            $previous = $curr;
            $curr=$curr->next;
        }
           return NULL;
  
    }
    
    public function find($key,$ref)
    {
        $curr = $this->firstLink;
        while($curr!= NULL)
        {
            if($curr->data['refnum']==$ref && $curr->data['name']==$key)
            {
                return $curr;
            }
            $curr=$curr->next;
        }
        return NULL;
    }

    
    public function totalLinks()
    {
        return $this->count;
    }
    
    public function getList()
    {
        $listData = array();
        $curr = $this->firstLink;
        
        while($curr != NULL)
        {
            array_push($listData, $curr->readLink());
            $curr = $curr->next;
        }
        return $listData;
    }

    function __destruct()
    {
        $curr = $this->firstLink;
        while($curr)
        {
            $temp=$curr;
            $curr=$curr->next;
            unset($temp);
        }
    }
}

?>