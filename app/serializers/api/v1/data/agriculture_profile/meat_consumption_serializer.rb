module Api
  module V1
    module Data
      module AgricultureProfile
        class MeatConsumptionSerializer < ActiveModel::Serializer
          attributes :location_id, :year, :meat_consumption_1, :meat_consumption_2,
                     :meat_consumption_3, :meat_consumption_4, :meat_consumption_per_capita_1,
                     :meat_consumption_per_capita_2, :meat_consumption_per_capita_3,
                     :meat_consumption_per_capita_4, :iso_code3

          def iso_code3
            object.location&.iso_code3
          end
        end
      end
    end
  end
end
