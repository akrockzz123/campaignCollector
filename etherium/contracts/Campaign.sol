pragma solidity ^0.4.26;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minima) public {

        address newCampaign = new Campaign(minima,msg.sender) ;  // create new Campaign contrcat

        // msg.sender => user who is trying to deploy contract

        deployedCampaigns.push(newCampaign); // storing addresees of created campaign


    }


    function getDeployedCampaigns() public view returns (address []) {
        return deployedCampaigns;
    }

    //  means no data inside the contract is modified only returns
}
contract Campaign {

    struct Request {
        string description;
        uint value;
        address recepient;
        bool complete;
        uint approvalCounts;
        mapping(address => bool) approvals;
    }

    Request[] public requests;

    address public manager;

    uint public minimumContribution;

    mapping(address => bool) public approvers;

    uint public approversCount;

    modifier restricted() {

        require(msg.sender == manager);

        _;
    }

    constructor (uint minimum, address creator) public { 

        manager = creator; // address of user who applied to create contract to super contract

        minimumContribution = minimum;
    }

    function contribute() public payable {

        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;

        approversCount++;
    }

    function createRequest(string description,uint value,address recepient) public restricted {


        Request memory newrequest = Request({
            description : description,
            value : value,
            recepient: recepient,
            complete: false,
            approvalCounts: 0

        });

        requests.push(newrequest);
    }

    function approveRequest(uint index) public {

        require(approvers[msg.sender]); // if sender has donated or not

        require(!requests[index].approvals[msg.sender]); // whether sender has allready voted or not

        requests[index].approvals[msg.sender] = true; // set sender true for approval

         requests[index].approvalCounts++; // increase approval of particular request

    }


    function finalizeRequest(uint index) public restricted {

        require(!requests[index].complete);

        require(requests[index].approvalCounts > (approversCount/2));

        requests[index].recepient.transfer(requests[index].value);

        requests[index].complete = true;

    }
}