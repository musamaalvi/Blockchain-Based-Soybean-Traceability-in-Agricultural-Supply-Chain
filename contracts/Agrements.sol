pragma solidity >= 0.5.0 < 0.7.0;

contract Agrements {
  string public description;
  string public date;
  string public purchaser;
  string public seller;
  address owner;

  modifier onlyOwner(){
    require(msg.sender == owner,
    "Not the real Owner"
    );
    _;
  }

  constructor(string memory _desc, string memory _date, string memory _purchaser, string memory _seller) public {
    description = _desc;
    date = _date;
    purchaser = _purchaser;
    seller = _seller;
    owner = msg.sender;
  }

}
