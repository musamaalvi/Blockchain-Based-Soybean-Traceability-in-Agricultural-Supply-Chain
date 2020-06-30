var Agreements = artifacts.require("Agrements");


module.exports = function(deployer){
    deployer.deploy(Agreements, "Proof of concept", "12/04/2020", "Usama", "Alvi");
}