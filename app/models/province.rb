class Province < ActiveRecord::Base
  # attr_accessible :title, :body
  INVESTMENT_POPULATION_REACH = 1000
  INVESTMENT_LAND_REACH = 20

  has_many :officers

  def method_missing method, *args, &block
    if method.match /^invest_in_(land|flood|fire)(?:_control)?$/
      self.send(:construction_project, raw_options: args[0], method: $1)
    else
      super
    end
  end

  def invest_in_safety options
    options[:generals].each do |general_id|
      general = Officer.find(general_id)
      population_helped = INVESTMENT_POPULATION_REACH * ( general.war.to_f / 100.00 )
      proportion_of_population_safe = ( population_helped / self.population.to_f ) * 100 + self.safety
      self.safety = [100, proportion_of_population_safe].min
    end
    self.save!
  end

  private
    def construction_project options
      gold = gold_per_investor(options[:raw_options][:gold], options[:raw_options][:generals])

      options[:raw_options][:generals].each do |general_id|
        self.send("#{options[:method]}=".to_sym, [100, self.send(options[:method].to_sym) + land_investment_return(gold, Officer.find(general_id))].min)
      end
      self.save!
    end

    def land_investment_return gold, general
      INVESTMENT_LAND_REACH * ( gold / 100 ) * (general.intelligence.to_f / 100) * 0.8 + (general.politics.to_f / 100) * 0.2
    end

    def gold_per_investor gold, investors
      gold / investors.length
    end
end
