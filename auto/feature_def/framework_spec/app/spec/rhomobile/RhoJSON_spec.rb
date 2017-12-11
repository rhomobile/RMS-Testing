require File.expand_path('../../spec_helper', __FILE__)


describe "Rhomobile#JSON" do

  it "general_test_json_parse" do

    simple_json = '{
            "quiz": {
                "sport": {
                    "q1": {
                        "question": "Which one is correct team name in NBA?",
                        "options": [
                            "New York Bulls",
                            "Los Angeles Kings",
                            "Golden State Warriros",
                            "Huston Rocket"
                        ],
                        "answer": "Huston Rocket"
                    }
                },
                "maths": {
                    "q1": {
                        "question": "5 + 7 = ?",
                        "options": [
                            10,
                            11,
                            12,
                            13
                        ],
                        "answer": 12
                    },
                    "q2": {
                        "question": "12 - 8 = ?",
                        "options": [
                            "1",
                            "2",
                            "3",
                            "4"
                        ],
                        "answer": "4"
                    }
                }
            }
        }'

    parsed_data = Rho::JSON.parse(simple_json)

    parsed_data.should_not == nil
    parsed_data.class.should == Hash
    parsed_data["quiz"].should_not == nil
    parsed_data["quiz"]["maths"].should_not == nil
    parsed_data["quiz"]["maths"]["q1"].should_not == nil
    parsed_data["quiz"]["maths"]["q1"]["question"].should_not == nil
    parsed_data["quiz"]["maths"]["q1"]["question"].should == "5 + 7 = ?"
    parsed_data["quiz"]["maths"]["q1"]["answer"].should_not == nil
    parsed_data["quiz"]["maths"]["q1"]["answer"].should == 12
    parsed_data["quiz"]["maths"]["q1"]["options"].should_not == nil
    parsed_data["quiz"]["maths"]["q1"]["options"].class.should == Array
    parsed_data["quiz"]["maths"]["q1"]["options"].size.should == 4
    parsed_data["quiz"]["maths"]["q1"]["options"][1].should == 11
  end

  it "process_unicode_literals" do
      string_with_utf8 = "Smiley: 🤑"
      json_with_unicode_literals = "\"Smiley: \\ud83e\\udd11\""

      test1 = string_with_utf8.to_json
      test1.should == json_with_unicode_literals

      test2 = Rho::JSON.parse(string_with_utf8.to_json)
      test2.should == string_with_utf8

      test3 = Rho::JSON.parse(json_with_unicode_literals)
      test3.should == string_with_utf8

  end

end
