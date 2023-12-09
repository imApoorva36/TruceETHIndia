// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OrganizationNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private organizationIdCounter;
    using Counters for Counters.Counter;
    Counters.Counter private categoryIdCounter;


    // Struct to store organization details
    struct Organization {
        string name;
        string description;
        address organizationAddress;
        uint256 funds;
        mapping(uint256 => Category) categories;
        uint256 cat_count;
        mapping(uint256 => Category) expenditure_categories;
        uint256 cat_expenditure_count;
        string chain_address;
    }

    // Struct to store category details
    struct Category {
        string name;
        uint256 balance;
    }

    // Mapping from organization ID to organization details
    mapping(uint256 => Organization) private organizations;

    // Event to log organization registration
    event OrganizationRegistered(
        uint256 organizationId,
        string name,
        string description,
        address organizationAddress,
        string chain_address
    );

    // Event to log funds sent to an organization
    event FundsSent(uint256 organizationId, uint256 categoryId, string categoryName, uint256 amount);

    // Event to log funds sent to an external account
    event FundsSentToAccount(address indexed organization, address indexed recipient, uint256 amount);

    // Event to log category creation
    event CategoryCreated(uint256 organizationId, uint256 categoryId, string categoryName);

    // Constructor initializes the NFT with a name and symbol
    constructor() ERC721("OrganizationNFT", "ORG") {}

    modifier onlyOrganizationOwner(uint256 _organizationId) {
        require(ownerOf(_organizationId) == msg.sender, "Not the owner of the organization");
        _;
    }

    // Function to register an organization and mint an NFT
    // Function to register an organization and mint an NFT
    function registerOrganization(
        string memory _name,
        string memory _description,
        string memory chain_address
    ) external returns (uint256) {
        require(bytes(_name).length > 0, "Organization name cannot be empty");
        require(bytes(_description).length > 0, "Organization description cannot be empty");

        // Mint a new NFT for the organization
        uint256 newOrganizationId = organizationIdCounter.current();
        _safeMint(msg.sender, newOrganizationId);

        // Create a new organization
        Organization storage org = organizations[newOrganizationId];
        org.name = _name;
        org.description = _description;
        org.organizationAddress = msg.sender;
        org.funds = 0;
        org.cat_count = 0;
        org.cat_expenditure_count = 0;

        emit OrganizationRegistered(newOrganizationId, _name, _description, msg.sender, chain_address);

        // Increment the organization ID counter
        organizationIdCounter.increment();

        // Return the organization ID
        return newOrganizationId;
    }


    // Function to create a new category for an organization
    function createCategory(uint256 _organizationId, string memory _categoryName) external onlyOrganizationOwner(_organizationId) {
        Organization storage org = organizations[_organizationId];
        require(bytes(_categoryName).length > 0, "Category name cannot be empty");

        // Create a new category
        org.categories[org.cat_count] = Category({
            name: _categoryName,
            balance: 0
        });
        emit CategoryCreated(_organizationId, org.cat_count, _categoryName);
        org.cat_count++;

        // Increment the category ID counter
    }

    function createExpenditureCategory(uint256 _organizationId, string memory _categoryName) external onlyOrganizationOwner(_organizationId) {
        Organization storage org = organizations[_organizationId];
        require(bytes(_categoryName).length > 0, "Category name cannot be empty");

        // Create a new category
        org.expenditure_categories[org.cat_expenditure_count] = Category({
            name: _categoryName,
            balance: 0
        });
        emit CategoryCreated(_organizationId, org.cat_expenditure_count, _categoryName);
        org.cat_expenditure_count++;

        // Increment the category ID counter
    }

    // Function to send funds to an organization under a specific category
    function sendFunds(uint256 _organizationId, uint256 _categoryId) external payable {
        Organization storage org = organizations[_organizationId];
        require(org.organizationAddress != address(0), "Organization does not exist");
        require(org.categories[_categoryId].balance >= 0, "Category does not exist");
        require(msg.value > 0, "Sent funds must be greater than 0");

        // Update category balance
        org.categories[_categoryId].balance += msg.value;

        // Update overall organization funds
        org.funds += msg.value;

        // Emit event
        emit FundsSent(_organizationId, _categoryId, org.categories[_categoryId].name, msg.value);
    }

    // Function to send funds from organization's category to a destination address
    function OrganizationSpend(
        uint256 _organizationId,
        uint256 _ExpenditureCategoryId,
        address _destinationAddress,
        uint256 _amount
    ) external onlyOrganizationOwner(_organizationId) {
        Organization storage org = organizations[_organizationId];

        // Check if the organization and category exist
        require(org.organizationAddress != address(0), "Organization does not exist");
        require(org.funds >= _amount, "Insufficient overall funds in the organization");

        // Update category balance
        org.expenditure_categories[_ExpenditureCategoryId].balance += _amount;

        // Update overall organization funds
        org.funds -= _amount;

        // Send funds to the destination address
        (bool success, ) = _destinationAddress.call{value: _amount}("");
        require(success, "Failed to send funds");

        // Emit event
        emit FundsSentToAccount(org.organizationAddress, _destinationAddress, _amount);
    }

    // Function to get organization details by ID
    // Function to get organization details by ID, including category names
function getOrganizationDetails(uint256 _organizationId)
    external
    view
    returns (
        string memory name,
        string memory description,
        address organizationAddress,
        uint256 funds,
        string[] memory categoryNames,
        uint256[] memory categorybalance
    )
{
    Organization storage org = organizations[_organizationId];

    // Get category names
    uint256 numCategories = org.cat_count;
    categoryNames = new string[](numCategories);
    for (uint256 i = 0; i < numCategories; i++) {
        categoryNames[i] = org.categories[i].name;
    }

    categorybalance = new uint256[](numCategories);

    for (uint256 i = 0; i < numCategories; i++) {
        categorybalance[i] = org.categories[i].balance;
    }

    return (org.name, org.description, org.organizationAddress, org.funds, categoryNames, categorybalance);
}

    // Function to get organization details by wallet address
    function getOrganizationsByAddress(address _walletAddress)
        external
        view
        returns (string[] memory names, string[] memory descriptions, address[] memory addressesOfOrg, uint256[] memory funds)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < organizationIdCounter.current(); i++) {
            Organization storage org = organizations[i];
            if (org.organizationAddress == _walletAddress) {
                names[count] = org.name;
                descriptions[count] = org.description;
                addressesOfOrg[count] = org.organizationAddress;
                funds[count] = org.funds;
                count++;
            }
        }
    }

    // Function to get all organization details without category balances
    function getAllOrganizations()
        external
        view
        returns (string[] memory names, string[] memory descriptions, address[] memory addressesOfOrg, uint256[] memory funds)
    {
        names = new string[](organizationIdCounter.current());
        descriptions = new string[](organizationIdCounter.current());
        addressesOfOrg = new address[](organizationIdCounter.current());
        funds = new uint256[](organizationIdCounter.current());

        for (uint256 i = 0; i < organizationIdCounter.current(); i++) {
            Organization storage org = organizations[i];
            names[i] = org.name;
            descriptions[i] = org.description;
            addressesOfOrg[i] = org.organizationAddress;
            funds[i] = org.funds;
        }
    }

    // Function to get category balances for a specific organization
    function getCategoryBalances(uint256 _organizationId)
        external
        view
        returns (uint256[] memory categoryIds, string[] memory categoryNames, uint256[] memory categoryBalances)
    {
        Organization storage org = organizations[_organizationId];
        uint256 numCategories = organizationIdCounter.current();

        categoryIds = new uint256[](numCategories);
        categoryNames = new string[](numCategories);
        categoryBalances = new uint256[](numCategories);

        uint256 count = 0;
        for (uint256 i = 0; i < numCategories; i++) {
            if (org.categories[i].balance > 0) {
                categoryIds[count] = i;
                categoryNames[count] = org.categories[i].name;
                categoryBalances[count] = org.categories[i].balance;
                count++;
            }
        }
    }


}
