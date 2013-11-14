require 'spec_helper'

describe GameProvincesController do
  it "has a show action" do
    lambda {get :show}.should_not raise_error
  end 
end 
