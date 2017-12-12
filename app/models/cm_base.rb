class CMBase
    include ActiveModel::Model
  
    attr_accessor :uniqueId, :code, :message
  
    def self.class_name_downcase_pluralized
      name.demodulize.downcase.pluralize
    end
  
    def self.api_resource_path
      name.demodulize.downcase.pluralize
    end
  
    def self.parent_path
      ''
    end
  
    def self.new(*attributes)
      attributes.first.reject!{|k| !self.instance_methods.include?(k.to_sym) } if attributes.first.present?
      super
    end
  end
  