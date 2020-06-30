pragma solidity >= 0.5.0 < 0.7.0;
import '../node_modules/@openzeppelin/contracts/math/SafeMath.sol';

contract Agrements {
  using SafeMath for uint;

  string public description;
  string public date;
  string public purchaser;
  string public seller;
  address owner;
  address[] purchasersList;
  uint[] amount;
  uint counterForPurchaser;


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
    counterForPurchaser = 0;
  }

  function tarnsaction() public payable {
    purchasersList.push(msg.sender);
    amount.push(msg.value);
    counterForPurchaser++;

  }
  function withdrawContract() public {
    msg.sender.transfer(amount[0]);
  }

  function getters() public view returns(address){
        return purchasersList[0];
  }
}
