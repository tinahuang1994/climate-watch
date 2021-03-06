module Api
  module V1
    module Data
      module AgricultureProfile
        class MeatConsumptionsController < Api::V1::Data::ApiController
          include CountableMetadata
          def index
            meat = ::AgricultureProfile::MeatConsumption.filter(params)

            render json: meat,
                   adapter: :json,
                   each_serializer: Api::V1::Data::AgricultureProfile::MeatConsumptionSerializer,
                   root: :data,
                   meta: meta(::AgricultureProfile::MeatConsumption,
                              ::AgricultureProfile::Metadatum.meat_consumptions)
          end
        end
      end
    end
  end
end
