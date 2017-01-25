app.controller('ProfileController', ['$http', '$mdDialog', 'BioFactory', 'AuthFactory', function($http, $mdDialog, BioFactory, AuthFactory) {
  console.log('ProfileController running');
  var self = this;

  var isMentor = false;
  var isStudent = false;
  self.mentor = BioFactory.mentorBio;
  self.addFaqClicked = false;
  self.profileTabSelected = true;
  self.faqTabSelected = false;
  self.userStatus = AuthFactory.userStatus;

  self.userData = {
    first_name: null,
    last_name: null,
    company: null,
    job_title: null,
    bio: null,
    state: null,
    race: null,
    gender: null,
    orientation: null,
    birthday: null,
    school: null,
    degree: null,
    major: null,
    language: null,
    stem_primary: null
  };

  self.faqData = {
    question: null,
    answer: null,
    faq_id: null
  };

  self.states = (
    'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV ' +
    'WI WY'
  ).split(' ').map(function(state) {
    return {
      abbrev: state
    };
  });

  self.primaryStemField = '';

  self.selectFaqTab = function(){
    console.log("SOMETHING");
    self.faqTabSelected = true;
    self.profileTabSelected = false;
  };

  self.selectProfileTab = function(){
    self.profileTabSelected = true;
    self.faqTabSelected = false;
  };

  self.changeAddFaqClicked = function(boolean){
    self.addFaqClicked = boolean;
    console.log(self.faqTabSelected);
  };

  self.saveFaq = function() {
    BioFactory.postFaq(self.faqData);
    self.addFaqClicked = false;
    console.log(self.addFaqClicked);
  };

  self.editFaqs = function(){
    BioFactory.editFaqs(self.mentor.faqs);
  };

  self.editBio = function(){
    console.log("Updates to profile data: ", self.userData);
    BioFactory.editBio(self.userData);
  };

  self.deleteUser = function(){
    console.log('delete user fired');
    BioFactory.deleteUser(self.userData);
  };

  self.createMessage = function(ev) {
    if(self.userStatus.isLoggedIn) {
      $mdDialog.show({
        controller: 'MessageController as message',
        templateUrl: '../../views/message-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
    } else {
      $mdDialog.show({
        controller: 'WarningController as warning',
        templateUrl: '../../views/warning-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }
  };

  BioFactory.getProfiles();

}]);
